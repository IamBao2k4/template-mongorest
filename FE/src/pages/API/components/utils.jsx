export function getKeysAdvance(data) {
  if (!data) return {};
  const matches = [...data.matchAll(/(param|body|header):([^"]+)/g)];
  const tempResult = matches.reduce((acc, match) => {
    const type = match[1];
    const value = match[2];

    if (type === 'jwt') {
      // Nếu là jwt, thêm vào header
      acc['header'] = acc['header'] || [];
      acc['header'].push(value);
    } else {
      // Xử lý các loại còn lại
      acc[type] = acc[type] || [];
      acc[type].push(value);
    }

    return acc;
  }, {});

  return tempResult;
}
