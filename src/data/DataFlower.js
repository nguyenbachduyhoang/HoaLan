import img1 from '../assets/img/Taichung-beauty.jpg';
import img2 from '../assets/img/Phalaenopsis-Delight.jpg';
import img3 from '../assets/img/Vanda-Blue.jpg';
import img4 from '../assets/img/Cymbidium-Elegance.jpg';
import img5 from '../assets/img/Dendrobium-Royal.jpg';
import img6 from '../assets/img/Cattleya-Queen.jpg';
import img7 from '../assets/img/Oncidium-Sunshine.jpg';
import img8 from '../assets/img/Miltonia-Sunset.jpg';
import img9 from '../assets/img/Zygopetalum-Emerald.jpg';
import img10 from '../assets/img/Paphiopedilum-Venus.jpg';
import img11 from '../assets/img/Brassavola-Star.jpg';
import img12 from '../assets/img/Laelia-Ruby.jpg';
import img13 from '../assets/img/Masdevallia-Flame.jpg';
import img14 from '../assets/img/Coelogyne-Crystal.jpg';
import img15 from '../assets/img/Lycaste-Pearl.jpg';
import img16 from '../assets/img/Bulbophyllum-Mystery.jpg';

const flowerData = [
  {
    id: "1",
    name: "Taichung Beauty",
    rating: 5,
    isSpecial: true,
    image: img1,
    color: "pink",
    origin: "Taiwan",
    category: "Cattleya",
    description: "Taichung Beauty là một trong những giống Cattleya nổi tiếng, với những bông hoa lớn màu hồng sáng và mùi hương nhẹ nhàng. Cây có khả năng phát triển tốt trong điều kiện ánh sáng vừa phải và ẩm độ cao.",
    price: "450.000",
    videoUrl: "https://www.youtube.com/watch?v=VVQ0p-9PdWM"
  },
  {
    id: "2",
    name: "Phalaenopsis Delight",
    rating: 4,
    isSpecial: false,
    image: img2,
    color: "white",
    origin: "Vietnam",
    category: "Phalaenopsis",
    description: "Phalaenopsis Delight là loài lan có hoa lớn, bền và dễ chăm sóc. Những bông hoa trắng tinh khiết với cánh hoa mềm mại thường nở trong thời gian dài, mang đến vẻ đẹp thanh lịch cho không gian.",
    price: "320.000",
    videoUrl: "https://www.youtube.com/watch?v=VVQ0p-9PdWM"
  },
  {
    id: "3",
    name: "Vanda Blue",
    rating: 5,
    isSpecial: true,
    image: img3,
    color: "blue",
    origin: "Thailand",
    category: "Vanda",
    description: "Vanda Blue là một trong những loài hoa lan hiếm với màu xanh đặc trưng. Bông hoa lớn, màu sắc rực rỡ và có hương thơm nhẹ, Vanda rất được yêu thích trong giới chơi lan.",
    price: "500.000",
    videoUrl: "https://www.youtube.com/watch?v=VVQ0p-9PdWM"
  },
  {
    id: "4",
    name: "Cymbidium Elegance",
    rating: 3,
    isSpecial: false,
    image: img4,
    color: "yellow",
    origin: "China",
    category: "Cymbidium",
    description: "Cymbidium Elegance có những bông hoa màu vàng với hình dáng thanh lịch. Chúng thường nở vào mùa đông và có thể sống trong điều kiện nhiệt độ thấp, làm cho chúng trở thành lựa chọn phổ biến cho mùa lễ hội.",
    price: "370.000",
    videoUrl: "https://www.youtube.com/watch?v=VVQ0p-9PdWM"
  },
  {
    id: "5",
    name: "Dendrobium Royal",
    rating: 4,
    isSpecial: true,
    image: img5,
    color: "purple",
    origin: "India",
    category: "Dendrobium",
    description: "Dendrobium Royal có hoa lớn, màu tím rực rỡ, mang lại vẻ đẹp quyến rũ. Chúng là loài lan rất dễ chăm sóc và thường nở vào mùa hè, phù hợp với khí hậu ấm áp.",
    price: "480.000",
    videoUrl: "https://www.youtube.com/watch?v=VVQ0p-9PdWM"
  },
  {
    id: "6",
    name: "Cattleya Queen",
    rating: 5,
    isSpecial: false,
    image: img6,
    color: "red",
    origin: "Brazil",
    category: "Cattleya",
    description: "Cattleya Queen là một giống lan được biết đến với những bông hoa lớn màu đỏ tươi và mùi hương thơm ngát. Chúng rất thích ánh sáng mạnh và ẩm độ cao, thích hợp để trồng trong nhà kính.",
    price: "400.000",
    videoUrl: "https://www.youtube.com/watch?v=VVQ0p-9PdWM"
  },
  {
    id: "7",
    name: "Oncidium Sunshine",
    rating: 4,
    isSpecial: true,
    image: img7,
    color: "yellow",
    origin: "Costa Rica",
    category: "Oncidium",
    description: "Oncidium Sunshine có những bông hoa nhỏ màu vàng giống như những tia nắng mặt trời, rất thu hút. Chúng nở rộ vào mùa hè và thường có khả năng chịu đựng tốt trong các điều kiện khác nhau.",
    price: "350.000",
    videoUrl: "https://www.youtube.com/watch?v=VVQ0p-9PdWM"
  },
  {
    id: "8",
    name: "Miltonia Sunset",
    rating: 3,
    isSpecial: false,
    image: img8,
    color: "orange",
    origin: "Brazil",
    category: "Miltonia",
    description: "Miltonia Sunset nổi bật với những bông hoa màu cam rực rỡ, thường được gọi là 'lan mặt trời'. Chúng thích hợp với khí hậu ấm và có thể sống trong nhiều điều kiện khác nhau.",
    price: "360.000",
    videoUrl: "https://www.youtube.com/watch?v=VVQ0p-9PdWM"
  },
  {
    id: "9",
    name: "Zygopetalum Emerald",
    rating: 5,
    isSpecial: true,
    image: img9,
    color: "green",
    origin: "Colombia",
    category: "Zygopetalum",
    description: "Zygopetalum Emerald là loài hoa lan có màu xanh lục độc đáo và hoa có hương thơm ngọt ngào. Chúng thường nở vào mùa xuân và đòi hỏi độ ẩm cao để phát triển tốt.",
    price: "520.000",
    videoUrl: "https://www.youtube.com/watch?v=VVQ0p-9PdWM"
  },
  {
    id: "10",
    name: "Paphiopedilum Venus",
    rating: 4,
    isSpecial: true,
    image: img10,
    color: "white",
    origin: "Malaysia",
    category: "Paphiopedilum",
    description: "Paphiopedilum Venus, thường được gọi là 'giày nàng tiên', có hoa lớn, màu trắng với hình dáng độc đáo. Chúng thích nghi tốt với điều kiện bóng râm và độ ẩm cao.",
    price: "400.000",
    videoUrl: "https://www.youtube.com/watch?v=VVQ0p-9PdWM"
  },
  {
    id: "11",
    name: "Brassavola Star",
    rating: 5,
    isSpecial: false,
    image: img11,
    color: "green",
    origin: "Mexico",
    category: "Brassavola",
    description: "Brassavola Star là loài lan có bông hoa màu xanh lá với hương thơm quyến rũ vào ban đêm. Chúng thường nở vào mùa hè và đòi hỏi ánh sáng mạnh để phát triển tốt.",
    price: "470.000",
    videoUrl: "https://www.youtube.com/watch?v=VVQ0p-9PdWM"
  },
  {
    id: "12",
    name: "Laelia Ruby",
    rating: 4,
    isSpecial: true,
    image: img12,
    color: "red",
    origin: "Brazil",
    category: "Laelia",
    description: "Laelia Ruby là loài hoa lan có màu đỏ rực, được yêu thích bởi hình dáng đẹp và khả năng nở bền. Chúng thích hợp với khí hậu ấm và có thể sống trong điều kiện ánh sáng mạnh.",
    price: "480.000",
    videoUrl: "https://www.youtube.com/watch?v=VVQ0p-9PdWM"
  },
  {
    id: "13",
    name: "Masdevallia Flame",
    rating: 3,
    isSpecial: false,
    image: img13,
    color: "orange",
    origin: "Ecuador",
    category: "Masdevallia",
    description: "Masdevallia Flame có hoa hình dáng độc đáo và màu sắc rực rỡ. Chúng thường yêu cầu độ ẩm cao và ánh sáng mềm mại để phát triển tốt.",
    price: "360.000",
    videoUrl: "https://www.youtube.com/watch?v=VVQ0p-9PdWM"
  },
  {
    id: "14",
    name: "Coelogyne Crystal",
    rating: 4,
    isSpecial: true,
    image: img14,
    color: "white",
    origin: "Malaysia",
    category: "Coelogyne",
    description: "Coelogyne Crystal có hoa màu trắng tinh khiết, thường nở vào mùa xuân và mùa hè. Chúng thích nghi tốt với điều kiện ẩm và cần ánh sáng vừa phải để phát triển.",
    price: "420.000",
    videoUrl: "https://www.youtube.com/watch?v=VVQ0p-9PdWM"
  },
  {
    id: "15",
    name: "Lycaste Pearl",
    rating: 5,
    isSpecial: false,
    image: img15,
    color: "yellow",
    origin: "Mexico",
    category: "Lycaste",
    description: "Lycaste Pearl là giống lan có hoa màu vàng nhạt và hương thơm nhẹ nhàng. Chúng thường nở vào mùa xuân và thích hợp với độ ẩm cao.",
    price: "490.000",
    videoUrl: "https://www.youtube.com/watch?v=VVQ0p-9PdWM"
  },
  {
    id: "16",
    name: "Bulbophyllum Mystery",
    rating: 4,
    isSpecial: true,
    image: img16,
    color: "purple",
    origin: "Thailand",
    category: "Bulbophyllum",
    description: "Bulbophyllum Mystery có hoa với hình dáng độc đáo và màu sắc rực rỡ, rất thu hút sự chú ý. Chúng thường yêu cầu độ ẩm cao và không thích ánh sáng mạnh.",
    price: "500.000",
    videoUrl: "https://www.youtube.com/watch?v=VVQ0p-9PdWM"
  }
];

export default flowerData;
