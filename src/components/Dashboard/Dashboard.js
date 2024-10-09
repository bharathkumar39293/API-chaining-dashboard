import {useState} from 'react'
import axios from 'axios'
import APIFlowChart from '../APIFlowChart/APIFlowChart'

const Dashboard = () => {
  const [users, setUsers] = useState([])
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const getUsers = async () => {
    try {
      setLoading(true)
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users',
      )
      setUsers(response.data)
    } catch (e) {
      setError('Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  const createPost = async userId => {
    try {
      setLoading(true)
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/posts',
        {
          title: postTitle,
          body: postBody,
          userId,
        },
      )
      setComments([...comments, response.data])
    } catch (e) {
      setError('Failed to create post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-6 px-4">
      <div className="max-w-5xl w-full space-y-8">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center">
          API Chaining Dashboard
        </h1>

        {/* Card for API interaction */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="space-y-6">
            {/* Get Users Button */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={getUsers}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg transition duration-300"
              >
                Get Users
              </button>
            </div>

            {/* Form for Creating Post */}
            <div className="space-y-4">
              <input
                type="text"
                value={postTitle}
                onChange={e => setPostTitle(e.target.value)}
                placeholder="Post Title"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
              <textarea
                value={postBody}
                onChange={e => setPostBody(e.target.value)}
                placeholder="Post Body"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => createPost(1)}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg transition duration-300"
                >
                  Create Post
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* API Flow Chart */}
        <APIFlowChart />

        {/* Loading, Error, and Data Display */}
        {loading && <p className="text-center text-gray-600">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {users.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Users:</h2>
            <pre className="bg-gray-100 p-4 rounded">
              {JSON.stringify(users, null, 2)}
            </pre>
          </div>
        )}

        {comments.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Comments:</h2>
            <pre className="bg-gray-100 p-4 rounded">
              {JSON.stringify(comments, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
