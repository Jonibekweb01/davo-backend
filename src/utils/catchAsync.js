// Bu funksiya controllerlarni o'rab oladi va xatolik bo'lsa avtomat next() ga otadi
module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
