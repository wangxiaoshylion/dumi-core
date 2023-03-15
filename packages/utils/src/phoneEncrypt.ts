/**
 * 手机号码脱敏
 * 格式为：13966992457或'13966992457' => 139****2457
 */
function phoneEncrypt(number: any) {
  return String(number).replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
}

export default phoneEncrypt;
