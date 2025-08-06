import './App.css'
import { RouterProvider } from 'react-router-dom'
import { Router } from './router/Router'
import { Provider } from 'react-redux'
import store from './redux/store'
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={Router} />
      <SpeedInsights />
    </Provider>
  )
}