// Lưu ảnh theo từng mục phòng. "Tất cả" sẽ tự tổng hợp.
// Mỗi mục có thể là chuỗi @url (phẩy hoặc xuống dòng), mảng url, hoặc mảng đối tượng { url, title, year }.
const CATEGORIES = {
"Tiểu Đội 203": `
@img/2031.jpg,
@img/2032.jpg,
@img/2033.jpg,
@img/2034.jpg,
@img/2035.jpg,
@img/2036.jpg,
@img/2037.jpg,
@img/2038.jpg,
@img/2039.jpg,
@img/20310.jpg,
@img/20311.jpg,
@img/20313.jpg,
@img/20314.jpg,


`,
"Tiểu Đội 204": `
@img/2041.jpg,@img/2042.jpg,
@img/2043.jpg,
@img/2044.jpg,
@img/2045.jpg,
@img/2046.jpg,
@img/2047.jpg,
@img/2048.jpg,
@img/2049.jpg,
@img/20410.jpg,
@img/20411.jpg,
@img/20412.jpg,
@img/20413.jpg,
@img/20414.jpg,
@img/20415.jpg,
@img/20416.jpg,
@img/20417.jpg,
@img/20418.jpg,
@img/20419.jpg,
@img/20420.jpg,
@img/20421.jpg,
@img/20422.jpg,
@img/20423.jpg,
@img/20424.jpg,
@img/20425.jpg,
@img/20426.jpg,
@img/20427.jpg,
@img/20428.jpg,
@img/20429.jpg,
@img/20430.jpg,
@img/20431.jpg,
@img/20432.jpg,
@img/20433.jpg,
@img/20434.jpg,
@img/20435.jpg,
@img/20437.jpg,
@img/20438.jpg,
@img/20439.jpg,
@img/20440.jpg,
@img/20441.jpg,
@img/20442.jpg,
@img/20443.jpg,
@img/20444.jpg,
@img/20445.jpg,
@img/20446.jpg,
@img/20447.jpg,
@img/20448.jpg,
@img/20449.jpg,
@img/20450.jpg,
@img/20451.jpg,
@img/20452.jpg,
@img/20453.jpg,
@img/20454.jpg, @img/20455.jpg, @img/20456.jpg, @img/20457.jpg, @img/20458.jpg ,@img/20459.jpg




`,
"Tiểu Đội 301": `
 @https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1600&auto=format&fit=crop
`,
"Tiểu Đội 302": `

 @img/3021.jpg,
 @img/3022.jpg,
 @img/3023.jpg,
 @img/3024.jpg,
 @img/3025.jpg,
 @img/3026.jpg,
 @img/3027.jpg,
 @img/3028.jpg,
 @img/3029.jpg,
 @img/30210.jpg,
 @img/30211.jpg,
 @img/30212.jpg,
 @img/30213.jpg,
 @img/30214.jpg,
 @img/30215.jpg,
 @img/30216.jpg,
 @img/30217.jpg,
 @img/30218.jpg,
 @img/30220.jpg,
`,
"Tiểu Đội 303": `
 
`,
"Tiểu Đội 304": `
 
`,
"Videos": `
  @https://youtu.be/mB-pwGVNjsQ,
 @https://youtu.be/rrn29dBtSew,
  @https://youtube.com/shorts/7E7W477xntc?feature=share,
`
};

