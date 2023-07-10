let passport = require('koa-passport'); 
let LocalStrategy = require('passport-local');
let User = require('../../models/user');

// Стратегия берёт поля из req.body
// Вызывает для них функцию
passport.use(new LocalStrategy({
    usernameField: 'email', 
    passwordField: 'password',
    passReqToCallback: true 
  },
  // Три возможных итога функции
  // done(null, user[, info]) ->
  //   strategy.success(user, info)
  // done(null, false[, info]) ->
  //   strategy.fail(info)
  // done(err) ->
  //   strategy.error(err)
  function(req, email, password, done) {
    User.findOne({ email }, function(err, user) {
      if (err) {
        return done(err);
      }

      if (!user || !user.checkPassword(password)) {

        return done(null, false, { message: 'Нет такого пользователя или пароль неверен.' });
      }
      return done(null, user);
    });
  }
));
