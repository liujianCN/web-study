/**
 * 得到乘机人类型
 * */
export const getPassengersType = type =>{
  switch (type) {
    case 'ADT':
      return '成人';
    case 'CHD':
      return '儿童';
    case 'INF':
      return '婴儿';
  }
};
/**
 * 证件类型
 * */
export const covertIdTypeCodeToCN = code => {
  switch (code) {
    case 'NI':
      return '身份证';
    case 'PP':
      return '护照';
    case 'HKPR':
      return '香港居民居住证';
    case 'MCPR':
      return '澳门居民居住证';
    case 'TWPR':
      return '台湾居民居住证';
    case 'FOREIGN':
      return '外国人永久居留身份证';
    case 'ID':
      return '其他';
  }
};
