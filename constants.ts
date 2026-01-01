
// Nội dung mặt trước (FRONT) - Về những ngày đã qua
export const LETTER_FRONT = {
  greeting: "Gửi Luyện Mai Nhi,",
  paragraphs: [
    "Thời gian trôi qua thật nhanh, anh hong nghĩ là tụi mềnh sẽ hong đi qua hết năm nay...",
    "Những khoảnh khắc bên nhau, những lần cười đùa, những câu chuyện vu vơ - tất cả giờ đây chỉ còn là kỷ niệm.",
    "Buồn thiệc ý nhưng mà anh cũng hiểu mà, có lẽ duyên mình chỉ đến được đó thui."
  ],
  sign: "Món quà cuối cùng tặng em hơ."
};

// Nội dung mặt sau (BACK) - Chúc Tết
export const LETTER_BACK = {
  greeting: "Chúc Mừng Năm Mới 2026!",
  paragraphs: [
    "Năm mới đến rồi, chúc em gái rượu một năm mới tràn đầy niềm vui và hạnh phúc!",
    "Mong em luôn mạnh khỏe, gặp nhiều may mắn, mọi điều tốt đẹp nhất sẽ đến với em.",
    "Dù có thế nào, hãy luôn mỉm cười và sống thật vui vẻ nhé! 🌸"
  ],
  sign: "Thân mến, chúc Tết vui vẻ! 🧧"
};

// Giữ lại APOLOGY_CONTENT để tương thích ngược (alias sang LETTER_FRONT)
export const APOLOGY_CONTENT = {
  greeting: LETTER_FRONT.greeting,
  paragraphs: LETTER_FRONT.paragraphs,
  sign: LETTER_FRONT.sign,
  btnYes: "Xem lời chúc Tết 🧧",
  btnNo: "Để sau 😊"
};
