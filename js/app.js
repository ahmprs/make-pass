
function init() {
    auth();
    document.getElementById("txt_make_pass").addEventListener("click", makePass);
    document.getElementById("txt_key").addEventListener("input", makePass);
    document.getElementById("txt_num").addEventListener("input", makePass);
    document.getElementById("txt_super_psw").addEventListener("input", makePass);
}

getHashInt = function (str) {
    var hash = 0;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash += char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash & hash;
}

getHashStr = function (seed, str_all) {

    var cnt = 15;
    var s = '' + seed;
    var psw_str = '';
    var indx = 0;
    var ch = '';

    var h = 0;

    for (var i = 0; i < cnt; i++) {

        if (i > 0 && i % 5 == 0) {
            s += '-';
            psw_str += '-';
        }

        h = getHashInt(s);
        h *= 1230;
        h += 5 * i;
        indx = h % str_all.length;

        ch = str_all.charAt(indx);

        psw_str += ch;
        s += ch;

    }
    return psw_str;
}

makePass = function () {
    // alert('oops');
    var k = document.getElementById("txt_key").value;
    var n = document.getElementById("txt_num").value;
    var sp = document.getElementById("txt_super_psw").value;

    var str_lc = 'abcdefghijklmnopqrstuvwxyz';
    var str_uc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var str_dgt = '1234567890';
    var str_sgn = '~@#$%';

    var str_all = str_lc + str_uc + str_dgt + str_sgn;
    var seed = getHashStr(getHashStr(sp, str_all) + getHashStr(n, str_all) + getHashStr(k, str_all),
        str_all);

    document.getElementById("spn1").innerHTML = getHashStr(seed, str_lc);
    document.getElementById("spn2").innerHTML = getHashStr(seed, str_uc + str_dgt);
    document.getElementById("spn3").innerHTML = getHashStr(seed, str_lc + str_uc + str_dgt);
    document.getElementById("spn4").innerHTML = getHashStr(seed, str_all);
}
