const monetaryMask = (value, initialLabel = "") => {
    value = value.toString();
    value = value.replace(/[\D]+/g, "") + "";
    value = value.replace(/([0-9]{2})$/g, ",$1");
    if (value.length > 6)
        value = value.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    return `${initialLabel} ${value == "NaN" ? "" : value.replace(/(\d)(?=(\d{3})+\.)/g, "$1.")}`;
};

export { monetaryMask }