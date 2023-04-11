class APIQueries {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
  const keyword = this.queryString.keyword
    ? {
        name: {
          $regex: /this.queryString.keyword/,
          $options: "i",
        },
      }
    : {};
  this.query = this.query.find({ ...keyword });
  return this;
}

  filter() {
    const queryCopy = { ...this.queryString };

    // Removing unwanted properties
    const removeKeys = ["keyword", "page", "limit"];
    removeKeys.forEach((key) => delete queryCopy[key]);

    console.dir(queryCopy, "query");

    // Filter for price range
    let queryString = JSON.stringify(queryCopy);
    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    console.dir(queryString, "query");

    this.query = this.query.find(JSON.parse(queryString));
    return this;
  }

   paginate(resultsPerpage) {
    const currentPage = Number(this.queryString.page) || 1;
    const skip = (currentPage - 1) * resultsPerpage;

    this.query = this.query.skip(skip).limit(resultsPerpage);
    return this;
  }
}

export default APIQueries;
