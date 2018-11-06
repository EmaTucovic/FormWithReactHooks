const schema = {
  fieldName: "name",
  label: "Name",
  defaultValue: "",
  validationRules: [
    {
      fn: function isName(val) {
        let reg = /^[a-zA-Z '-]*$/i;
        if (!reg.test(val)) {
          return "Not valid name";
        }
      }
    }
    // {
    //   fn: function isRequired(val) {
    //     if (!val || !String(val).trim()) {
    //       return "Name is required";
    //     }
    //   }
    // }
  ],
  isVisible: true
};

export default schema;
