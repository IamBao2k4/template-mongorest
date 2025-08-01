'use client';

import { entityDataApi } from '@/services/entity-data';
import { createContext, useContext, useEffect, useState } from 'react';
import { getKeysAdvance } from './utils';
import { useLocation, useParams } from 'react-router-dom';

const APIContext = createContext({});
export const APIProvider = ({ children, entity }) => {
  const { search, pathname } = useLocation();
  const searchParams = new URLSearchParams(search);
  const params = useParams();
  const [method, setMethod] = useState(searchParams.get('method'));
  const [id, setId] = useState(params.id);
  const [dataSidebar, setDataSidebar] = useState([]);
  const [dataSelected, setDataSelected] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [settings, setSettings] = useState({});
  const [tabs, setTabs] = useState([]);
  const [selectedTab, setSelectedTab] = useState(-1);
  const [openSidebar, setOpenSidebar] = useState([]);
  const [deletedMethod, setDeletedMethod] = useState([]);
  const [typeAddTab, setTypeAddTab] = useState('replace');
  const [tester, setTester] = useState(null);
  const isNew = pathname === '/role-settings' || pathname === '/workflow-settings';

  useEffect(() => {
    try {
      const data = localStorage.getItem('sidebar');
      if (data) {
        setOpenSidebar(JSON.parse(data));
      }
    } catch (error) {
      console.log('🚀 ~ useEffect ~ error:', error);
    }
  }, []);

  const handleChangeOpenSidebar = (value) => {
    try {
      const data = [...openSidebar];
      const checkIn = openSidebar.findIndex((item) => item === value);
      if (checkIn > -1) {
        data.splice(checkIn, 1);
      } else {
        data.push(value);
      }
      setOpenSidebar(data);
      localStorage.setItem('sidebar', JSON.stringify(data));
    } catch (error) {
      console.log('🚀 ~ handleChangeOpenSidebar ~ error:', error);
    }
  };

  const getSide = async () => {
    try {
      const response = await entityDataApi().getData({
        entity,
        params: { limit: 50 },
      });
      setDataSidebar(response?.data);
    } catch (error) {
      console.log('🚀 ~ error:', error);
    }
  };

  const checkInLocal = (idSelected, method, title) => {
    const checkInTabs = tabs?.findIndex((item) => item?.id === idSelected);
    const data = [...tabs];
    if (checkInTabs > -1) {
      data[checkInTabs].method = method;
    } else {
      const _default = {
        method,
        id: idSelected,
        title: dataSidebar.find((item) => item._id === idSelected)?.title || 'New',
      };
      if (typeAddTab === 'new' || data?.length === 0) {
        data.push(_default);
        setTypeAddTab('replace');
      } else {
        data[data.length - 1] = _default;
      }
    }
    handleChangeTab(data);
  };

  const getTabs = async () => {
    try {
      const data = localStorage.getItem('apis');
      if (data) {
        const _data = JSON.parse(data);
        const response = await entityDataApi().getData({
          entity,
          params: { limit: 50, 'search[_id:in]': _data.map((item) => item.id).join(',') },
        });
        setTabs(_data);
      }
    } catch (error) {
      console.log('🚀 ~ useEffect ~ error:', error);
      localStorage.removeItem('apis');
    }
  };

  useEffect(() => {
    getSide();
    getTabs();
  }, []);

  useEffect(() => {
    if (refresh) {
      getSide();
      setRefresh(false);
    }
  }, [refresh]);

  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    setMethod(search.get('method'));
    setId(params.id);
  }, []);

  const handleChangeTab = (data) => {
    setTabs(data);
    localStorage.setItem('apis', JSON.stringify(data));
  };

  useEffect(() => {
    (async () => {
      if (dataSelected?._id && id === dataSelected?._id) {
        if (method && !settings?.[method]) {
          setSettings((pre) => ({
            ...pre,
            [method]: { validate: [], headers: [], params: [], body: [] },
          }));
        }
      } else {
        if (id) {
          try {
            const response = await entityDataApi().getDetail({
              entity,
              id,
            });
            setDataSelected(response?.data);
            const _settings = response?.data?.settings;

            if (method && !_settings?.[method]) {
              _settings[method] = { validate: [], headers: [], params: [], body: [] };
            }
            Object.keys(_settings).map((item) => {
              const _detect = [];
              const _m = _settings[item];
              _detect.push(
                ...(_m?.validate?.[0]?.data || []),
                ...(_m?.validate?.[0]?.response || [])
              );
              if (_detect?.length > 0) {
                const res = {
                  param: [],
                  body: [],
                  header: [],
                };

                _detect?.map((item) => {
                  const inputString = item?.advance || item?.queryAdvance;
                  if (inputString) {
                    const tempResult = getKeysAdvance(inputString);
                    Object.keys(tempResult).forEach((key) => {
                      if (!res[key]) res[key] = [];
                      res[key] = [...new Set([...res[key], ...tempResult[key]])];
                    });
                  }
                });

                _settings[item].default = res;
              }
            });

            setSettings(_settings);
            document.title = response?.data?.title;
          } catch (error) {
            console.log('🚀 ~ error:', error);
          }
        }
      }
    })();
  }, [id, method]);

  useEffect(() => {
    if (isNew) {
      setDataSelected({});
      setMethod(null);
      setSettings({});
      setId(null);
    }
  }, [pathname]);

  const handleChangeApi = (id) => {
    setId(id);
    setMethod(null);
    checkInLocal(id, null);
  };

  const handleChangeMethod = (idSelected, method) => {
    if (idSelected) {
      setId(idSelected);
      checkInLocal(idSelected, method);
    } else {
      const data = [...tabs];
      const checkInTabs = tabs?.findIndex((item) => item?.id === id);
      if (checkInTabs > -1) {
        data[checkInTabs].method = method;
        handleChangeTab(data);
      }
    }

    setMethod(method);

    if (!idSelected && !settings?.[method]) {
      setSettings((pre) => ({
        ...pre,
        [method]: { validate: [], headers: [], params: [], body: [] },
      }));
    }
    const url = new URL(window.location);
    url.searchParams.set('method', method);
    window.history.pushState({}, '', url);
  };

  const handleDeleteMethod = () => {
    const _settings = { ...settings };
    const _deletedMethod = [...deletedMethod, method];
    _deletedMethod.forEach((item) => {
      delete _settings[item];
    });
    setDeletedMethod(_deletedMethod);
    const keys = Object.keys(_settings);
    if (keys?.length > 0) {
      handleChangeMethod(id, keys[0]);
    } else {
      setMethod(null);
      const url = new URL(window.location);
      url.searchParams.delete('method');
      window.history.pushState({}, '', url);
    }
  };

  return (
    <APIContext.Provider
      value={{
        id,
        method,
        handleChangeMethod,
        handleChangeApi,
        dataSidebar,
        setDataSidebar,
        dataSelected,
        setDataSelected,
        settings,
        setSettings,
        setRefresh,
        isNew,
        handleDeleteMethod,
        tabs,
        selectedTab,
        setSelectedTab,
        handleChangeTab,
        openSidebar,
        handleChangeOpenSidebar,
        deletedMethod,
        setDeletedMethod,
        typeAddTab,
        setTypeAddTab,
        tester,
        setTester,
        entity,
      }}>
      {children}
    </APIContext.Provider>
  );
};

export const useApi = () => useContext(APIContext);
