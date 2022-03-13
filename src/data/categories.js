const Axios = require("axios");

async function fetchCatagories() {
  try {
    const res = await Axios.get(
      "https://fswd-wp.devnss.com/wp-json/wp/v2/categories"
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

module.exports = fetchCatagories();
