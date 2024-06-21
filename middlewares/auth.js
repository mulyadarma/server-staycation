// membuat autifikasi jika user sudah berhasil login, agar tidak bisa sembambarang pindah halaman
// di hubungkan dengan session di file adminController.js function actionSignin
// cara baca:
// jika user kosong atau tidak ada maka kembalikan ke hal /admin/signin, tapi jika berhasil lanjutkan kehalaman selanjutnya

const isLogin = (req, res, next) => {
  if (req.session.user == null || req.session.user == undefined) {
    req.flash("alertMessage", "Session telah habis silahkan signin kembali");
    req.flash("alertStatus", "danger");
    res.redirect("/admin/signin");
  } else {
    next();
  }
};

module.exports = isLogin;
