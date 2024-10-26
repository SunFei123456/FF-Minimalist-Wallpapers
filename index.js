

function compareVersion(version1, version2) {
    //TODO：待补充代码
    // 校验通过
    version1.split('').map((n)=>{
        // console.log(',,,',n)
        if(n !== '.'){
            // 进行校验, n 是否是非负整数
            if (n <= 0) {
                return 'error'
            }else{
                // 进行第二个版本号的校验
                version2.split('').map((m)=>{
                    // console.log(m)
                    if(m !== '.'){
                        if (m <= 0) {
                            return 'error'
                        }else{
                            //
                        }
                    }
                })

            }
        }
    })

    

}
// 检查输入的版本号格式是否满足测试需要.

//测试用例
console.log(compareVersion('1.2.3', '1.2.4')); // 输出 -1，即：版本号1小于版本号2
console.log(compareVersion('1.2.3', '1.2.3')); // 输出 0，即：版本号1等于版本号2
console.log(compareVersion('1.2.3', '1.2.2')); // 输出 1，即：版本号1大于版本号2
console.log(compareVersion('0.2.3', '1.2.2')); // 输出 -1，即：版本号1小于版本号2
console.log(compareVersion('1.2.0', '1.2')); // 输出 error，即：版本号格式不正确
console.log(compareVersion('1.2.02', '1.2.2')); // 输出 0，即：版本号1等于版本号2
console.log(compareVersion('1.2.aa', '1.2'));// 输出 error，即：版本号格式不正确
console.log(compareVersion('1.2.2a', '1.2'));// 输出 error，即：版本号格式不正确
console.log(compareVersion('1.2.1.1', '1.2'));// 输出 error，即：版本号格式不正确
console.log(compareVersion('1.2.-3', '1.2'));// 输出 error，即：版本号格式不正确


// 检测需要，请勿删除
module.exports = compareVersion;