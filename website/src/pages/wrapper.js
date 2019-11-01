import 'ukelli-ui/style/default.scss';

export default ({ children }) => {
  window.__removeLoading();
  return children;
};