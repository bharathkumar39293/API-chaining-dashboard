import React, {useState} from 'react'
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
    } catch (error) {
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
          userId: userId,
        },
      )
      setComments([...comments, response.data])
    } catch (error) {
      setError('Failed to create post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">API Chaining Dashboard</h1>
      <button
        onClick={getUsers}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Get Users
      </button>

      <div>
        <input
          type="text"
          value={postTitle}
          onChange={e => setPostTitle(e.target.value)}
          placeholder="Post Title"
          className="p-2 border rounded mb-2"
        />
        <textarea
          value={postBody}
          onChange={e => setPostBody(e.target.value)}
          placeholder="Post Body"
          className="p-2 border rounded mb-2"
        />
        <button
          onClick={() => createPost(1)}
          className="bg-green-500 text-white px-4 py-2 rounded mt-2"
        >
          Create Post
        </button>
      </div>

      <APIFlowChart />

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {users.length > 0 && <pre>{JSON.stringify(users, null, 2)}</pre>}
      {comments.length > 0 && <pre>{JSON.stringify(comments, null, 2)}</pre>}
    </div>
  )
}

export default Dashboard
