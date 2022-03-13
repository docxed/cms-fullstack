const Axios = require("axios");

async function fetchTags() {
  try {
    const res = await Axios.get(
      "https://fswd-wp.devnss.com/wp-json/wp/v2/tags"
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

module.exports = fetchTags();
