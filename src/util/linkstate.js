function createHandler(component, key) {
  return e => {
    const el = e.target;
    const value = el.type === 'checkbox' ? el.checked : el.value;
    component.setState({
      [key]: value,
    });
  };
}
 
export default function (component, key) {
  const cache = component.__linkStateHandlers ||
    (component.__linkStateHandlers = {});
 
  return cache[key] || (cache[key] = createHandler(component, key));
}
