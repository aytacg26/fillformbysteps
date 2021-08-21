import classes from './App.module.scss';
import Form from './components/Form/Form';

const App = () => {
  return (
    <div className={classes.appContainer}>
      <Form />
    </div>
  );
};

export default App;
