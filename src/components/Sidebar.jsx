import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className='w-64 h-screen bg-white shadow-lg p-6'>
      <h1 className='text-2xl font-bold text-indigo-600 mb-8'>Finance</h1>

      <div className='space-y-4'>
        <Link to='/'>Dashboard</Link>
        <Link to='/expenses'>Expenses</Link>
        <Link to='/budget'>Budget</Link>
        <Link to='/savings'>Savings</Link>
      </div>
    </div>
  )
}