export const hierarchalOkrs = (okrs) => {
  let processedOkrs = {};

  if (!okrs) return processedOkrs;

  okrs.forEach((okrSrc) => {
    let okr = Object.assign({}, okrSrc);

    if (!okr.parent_objective_id) {
      // Parent node

      if (!processedOkrs[okr.id]) {
        okr["keyId"] = okr.id;
        okr["children"] = [];
        processedOkrs[okr.id] = okr;
      }
    } else {
      // Child node

      let parent = processedOkrs[okr.parent_objective_id];
      let parentSearch;

      if (!parent) {
        // Child node's parent has not processed yet

        parentSearch = okrs.find((o) => o.id === okr.parent_objective_id);

        if (!parentSearch) return; // Discarding child as it's parent doesn't exists

        parent = Object.assign({}, parentSearch);
        processedOkrs[okr.parent_objective_id] = parent;
      }

      parent["keyId"] = parent.id;
      okr["keyId"] = parent.id + "_" + okr.id;

      parent["children"].push(okr);
    }
  });

  return processedOkrs;
};

export const getCategoryList = (okrs) => {
  if (!okrs) return [];

  let categorySet = new Set();

  okrs.map((okr) => {
    categorySet.add(okr.category);
  });

  return Array.from(categorySet);
};

export const filterOkrsByCategory = (okrs, filterCategory) => {
  if (!okrs) return [];
  if (!filterCategory || filterCategory == "all") return okrs;

  return okrs.filter((okr) => {
    return okr.category === filterCategory;
  });
};
