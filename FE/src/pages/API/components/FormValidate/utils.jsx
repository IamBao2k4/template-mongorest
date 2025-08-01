export function groupValuesByPrefix(rules) {
  let grouped = {};

  // Hàm để lấy prefix và key từ value
  function extractPrefixAndKey(value) {
    // Sử dụng regex để tách phần sau ":" làm prefix và phần sau "." làm key
    const matches = value.match(/:(\w+)\.(.+)$/);
    if (matches) {
      return {
        prefix: matches[1], // Prefix sau dấu ":"
        key: matches[2], // Key sau dấu "."
        entity: value?.split(':')[0].replace('$', ''),
      };
    }
    return null;
  }

  // Đệ quy qua các rules và xử lý giá trị
  function processRules(rules) {
    rules.forEach((rule) => {
      if (rule.value && typeof rule.value === 'string' && rule.value.startsWith('$')) {
        // Chỉ xử lý value bắt đầu bằng "$"
        const result = extractPrefixAndKey(rule.value);
        if (result) {
          const { prefix, key, entity } = result;
          if (!grouped[prefix]) {
            grouped[prefix] = [];
          }
          grouped[prefix].push(entity + '/' + key); // Thêm key vào nhóm tương ứng
        }
      }

      // Nếu có nested rules, đệ quy xử lý tiếp
      if (rule.rules) {
        processRules(rule.rules);
      }
    });
  }

  // Bắt đầu xử lý từ rules đầu vào
  processRules(rules);
  return grouped;
}

export function extractKeysWithAt(pipeline) {
  const result = {};

  function findKeys(obj) {
    for (const key in obj) {
      if (typeof obj[key] === 'string' && obj[key].startsWith('@')) {
        const prefix = obj[key].split(':')[0].substring(1); // Extract prefix (e.g., params, body)
        const value = obj[key].split(':')[1]; // Extract value after ':'
        if (!result[prefix]) {
          result[prefix] = [];
        }
        result[prefix].push(value);
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        findKeys(obj[key]);
      } else if (Array.isArray(obj[key])) {
        obj[key].forEach((item) => {
          if (typeof item === 'object' && item !== null) {
            findKeys(item);
          }
        });
      }
    }
  }

  pipeline.forEach((stage) => {
    findKeys(stage);
  });

  return result;
}

export function mergeMultipleObjects(objects) {
  return objects.reduce((merged, current) => {
    // Lấy tất cả các key của object hiện tại
    Object.keys(current).forEach((key) => {
      // Nếu key chưa tồn tại trong merged, khởi tạo nó
      if (!merged[key]) {
        merged[key] = [];
      }
      // Gộp giá trị và loại bỏ trùng lặp
      merged[key] = [...new Set([...merged[key], ...current[key]])];
    });
    return merged;
  }, {}); // Khởi tạo `merged` là một object rỗng
}
