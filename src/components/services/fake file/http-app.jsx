import React, { Component } from "react";
import { apiEndPoint } from "./config.json";
import httpServer from "./http-serves";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class App extends Component {
  state = { posts: [] };

  async componentDidMount() {
    const { data: posts } = await httpServer.get(apiEndPoint);
    this.setState({ posts });
  }
  handleAdd = async () => {
    const obj = { title: "new column" };
    const { data: post } = await httpServer.post(apiEndPoint, obj);
    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };
  handleUpdate = async (post) => {
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index].like = !post.like;
    const { data } = await httpServer.put(apiEndPoint + "/" + post.id, post);
    console.log(data);

    this.setState({ posts });
  };
  handleDelete = async (post) => {
    const originalPost = this.state.posts;
    const posts = this.state.posts.filter((p) => p.id !== post.id);
    this.setState({ posts });
    try {
      await httpServer.delete(apiEndPoint + "/ndfnvkj/kvjdf/fv");
    } catch (err) {
      if (err.response && err.response.status === 404) {
        toast("Something Bad Happend when deleted this post");
        console.log(err);
        this.setState({ posts: originalPost });
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <button className="btn btn-primary m-3" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table container">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
