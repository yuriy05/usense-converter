import Converter from "./Converter/Converter"
import styles from './App.module.css'

const App: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Converter />
    </div>
  )
}

export default App;