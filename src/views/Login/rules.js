export const mobileRules = [
  { require: true },
  {
    pattern:
      /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
    message: '手机号格式不正确！'
  }
]
export const codeRules = [
  { require: true },
  {
    pattern: /[0-9]{6}/,
    message: '验证码格式不正确！'
  }
]
