module.exports = {
    formatDate: (date) => {
      let options = {
        year: '2-digit',
        month: 'numeric',
        day: 'numeric'
      };
      return new Intl.DateTimeFormat('en-US', options).format(date);
    },
  };