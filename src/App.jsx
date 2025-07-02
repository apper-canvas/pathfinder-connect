import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from '@/components/organisms/Layout'
import Assessment from '@/components/pages/Assessment'
import CareerPaths from '@/components/pages/CareerPaths'
import PathDetails from '@/components/pages/PathDetails'
import LearningPlan from '@/components/pages/LearningPlan'
import Jobs from '@/components/pages/Jobs'
import Progress from '@/components/pages/Progress'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-background via-surface to-primary-50">
        <Layout>
          <Routes>
            <Route path="/" element={<Assessment />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/career-paths" element={<CareerPaths />} />
            <Route path="/career-paths/:pathId" element={<PathDetails />} />
            <Route path="/learning-plan" element={<LearningPlan />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/progress" element={<Progress />} />
          </Routes>
        </Layout>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ zIndex: 9999 }}
        />
      </div>
    </Router>
  )
}

export default App