export const getErrorText = (code: number) => {
  switch (code) {
    case 200:
      return "성공!"
    case 401:
      return "권한이 없습니다!"
    case 403:
      return "비밀번호가 잘못되었습니다!"
    case 404:
      return "잘못된 접근입니다!"
    case 409:
      return "이미 존재합니다!"
    case 410:
      return "이미 삭제되었거나 존재하지 않습니다!"
    case 412:
      return "데이터가 비어있습니다!"
    case 413:
      return "허용량을 초과하였습니다!"
    case 500:
      return "서버 에러발생, 관리자에게 문의바랍니다.."
    default:
      return "에러가 발생하였습니다!"
  }
}
