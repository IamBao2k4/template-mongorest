import * as fs from 'fs';
import * as path from 'path';
import { coreGlobal } from '../configs/core-global';
import cron from 'node-cron';

export interface DataSetup {
    merge: string;
}

export interface DataCronJob {
    collection_name: string;
    arrgregate: string;
    setup: DataSetup[];
}

export interface CronJobConfig {
    _id: string;
    title: string;
    cron_expression: string; // "* * * * *" pattern
    is_active: boolean;
    data?: DataCronJob;
}

export class DynamicCronService {
    private configPath: string;
    private dynamicJobIds: Set<string> = new Set();
    private cronJobs: Map<string, any> = new Map();
    private db: any;

    constructor() {
        this.configPath = path.join(process.cwd(), 'json/jobs', 'cronjobs.json');
    }

    async onModuleInit() {
        this.db = coreGlobal.getCore().getAdapter("mongodb");
        await this.loadAndRegisterCronJobs();
        this.watchConfigChanges();
    }

    private async executeJob(jobConfig: CronJobConfig) {
        try {
            await this.processCronJob(jobConfig);
        } catch (error) {
            console.error(`Error executing job ${jobConfig.title}:`, error);
        }
    }

    private async processCronJob(jobConfig: CronJobConfig) {
        console.log(`Processing cron job: ${jobConfig.title}`);
        let data = jobConfig.data;
        try {
            if (data) {
                const customDb = await this.db.getIntanceDb();
                const collection = customDb.collection(data.collection_name);
                for (let setup of data.setup) {
                    let merge = JSON.parse(setup.merge);
                    let arrgregate = data.arrgregate;
                    let query = [
                        ...JSON.parse(arrgregate),
                        ...(Array.isArray(merge) ? merge : [merge]),
                    ];
                    await collection.aggregate(query).toArray();
                }
            }
        } catch (error) {
            console.error(`Error processing cron job ${jobConfig.title}:`, error);
        }
    }

    async loadAndRegisterCronJobs() {
        try {
            if (!fs.existsSync(this.configPath)) {
                console.log('Cronjobs config file not found, creating empty one');
                fs.writeFileSync(this.configPath, JSON.stringify([], null, 2));
                return;
            }
            const configContent = fs.readFileSync(this.configPath, 'utf8');
            const cronConfigs: CronJobConfig[] = JSON.parse(configContent);
            this.removeAllDynamicCronJobs();
            for (const config of cronConfigs) {
                if (config.is_active) {
                    await this.registerCronJob(config);
                }
            }
            console.log(`Registered ${cronConfigs.filter(c => c.is_active).length} dynamic cronjobs`);
        } catch (error) {
            console.error('Error loading cron jobs:', error);
        }
    }

    async registerCronJob(config: CronJobConfig) {
        try {
            const job = cron.schedule(config.cron_expression, () => {
                this.executeJob(config);
            });
            this.cronJobs.set(config._id, job);
            this.dynamicJobIds.add(config._id);
            job.start();
            console.log(`Registered dynamic cronjob: ${config.title} (${config.cron_expression})`);
        } catch (error) {
            console.error(`Error registering cronjob ${config.title}:`, error);
        }
    }

    removeCronJob(jobId: string) {
        try {
            if (this.dynamicJobIds.has(jobId)) {
                const job = this.cronJobs.get(jobId);
                if (job) {
                    job.stop();
                    job.destroy();
                    this.cronJobs.delete(jobId);
                }
                this.dynamicJobIds.delete(jobId);
                console.log(`Removed dynamic cronjob: ${jobId}`);
            } else {
                console.log(`Job ${jobId} is not a dynamic cronjob or does not exist`);
            }
        } catch (error) {
            console.error(`Error removing cronjob ${jobId}:`, error);
        }
    }

    removeAllDynamicCronJobs() {
        try {
            for (const jobId of this.dynamicJobIds) {
                try {
                    const job = this.cronJobs.get(jobId);
                    if (job) {
                        job.stop();
                        job.destroy();
                        this.cronJobs.delete(jobId);
                    }
                } catch (err) {
                    console.warn(`Failed to delete cronjob ${jobId}:`, err);
                }
            }
            const count = this.dynamicJobIds.size;
            this.dynamicJobIds.clear();
            console.log(`Removed ${count} dynamic cronjobs`);
        } catch (error) {
            console.error('Error removing dynamic cronjobs:', error);
        }
    }

    private watchConfigChanges() {
        fs.watch(this.configPath, async (eventType) => {
            if (eventType === 'change') {
                console.log('Cronjobs config file changed, reloading...');
                await this.loadAndRegisterCronJobs();
            }
        });
    }

    async addCronJob(config: CronJobConfig) {
        try {
            const configContent = fs.readFileSync(this.configPath, 'utf8');
            const cronConfigs: CronJobConfig[] = JSON.parse(configContent);
            const existingIndex = cronConfigs.findIndex(c => c._id === config._id);
            if (existingIndex >= 0) {
                cronConfigs[existingIndex] = config;
            } else {
                cronConfigs.push(config);
            }
            fs.writeFileSync(this.configPath, JSON.stringify(cronConfigs, null, 2));
            if (this.dynamicJobIds.has(config._id)) {
                this.removeCronJob(config._id);
            }
            if (config.is_active) {
                await this.registerCronJob(config);
            }
            return true;
        } catch (error) {
            console.error('Error adding cronjob:', error);
            return false;
        }
    }
}