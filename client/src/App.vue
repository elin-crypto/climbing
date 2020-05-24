<template>
 <div class="container">
    <header>
      <div id="heading">
        <h1> En klättrares guide till klippan</h1>
      </div>
      <nav class="mainNav">
        <ul>
            <li><a href="index.html">Hem</a></li>
            <li><a href="">Kontakt</a></li>
            <li><a href="">Logga in</a></li>
        </ul>
      </nav>
    </header>



    <div id="main">
      
      <!----------------
        LEFT SIDE COLUMN
        ---------------->
      
      <div id="left">
             
        <p class="error" v-if="error">{{ error }}</p>

        <div id="route-list"></div>

        <div class="post-container">
          <div class="post"
          v-for="(post, index) in posts"
          v-bind:item="post"
          v-bind:index="index"
          v-bind:key="post._id"
          >
          <div v-if="!editPost">

            <h2 class="name">{{ post.name }}</h2>
            <p class="grade">{{ post.grade }}</p>
            <p class="area"><strong>Område: </strong>{{ post.area }}</p>
            <p class="description"><strong>Beskrivning: </strong>{{ post.description }}</p>
            <p class="type"><strong>Typ: </strong>{{ post.type }}</p>
            <button class="btn" @click="deletePost(post._id)">Radera</button>
            <button class="btn" @click="editPost=post">Uppdatera</button>
          </div>
          <div v-else>

            <div class="create-post">
          <h2>Uppdatera problem</h2>
          <label for="create-post">Namn:</label><br>
          <input type="text" id="create-name" v-model="editPost.name"><br>
          <p>Grad: </p> 
          <input type="text" id="create-grade" v-model="editPost.grade"><br>
          <p>Område:</p>
          <input type="text" id="create-area" v-model="editPost.area"><br>
          <p>Beskrivning:</p>
          <input type="text" id="create-description" v-model="editPost.description"><br>
          <p>Typ:</p>
          <input type="text" id="create-type" v-model="editPost.type"><br>
          <button class="btn" @click="addPost()">Lägg till nytt problem!</button>
          <button class="btn" @click="editPost=null;">Avbryt</button>

        </div>

          </div>
          </div><!-- end post -->
        </div><!-- end post-container -->
      </div><!-- end LEFT COLUMN -->
          <!----------------
        RIGHT SIDE COLUMN
        ---------------->
      <div id="right" v-if="!editPost">
        <div class="create-post">
          <h2>Nästa problem</h2>
          <label for="create-post">Namn:</label><br>
          <input type="text" id="create-name" v-model="rutt.name"><br>
          <p>Grad: </p> 
          <input type="text" id="create-grade" v-model="rutt.grade"><br>
          <p>Område:</p>
          <input type="text" id="create-area" v-model="rutt.area"><br>
          <p>Beskrivning:</p>
          <input type="text" id="create-description" v-model="rutt.description"><br>
          <p>Typ:</p>
          <input type="text" id="create-type" v-model="rutt.type"><br>
          <button class="btn" @click="addPost()">Lägg till nytt problem!</button>
        </div>
      </div>
    </div><!--end main-->
  </div><!-- end container -->
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    rutt: {
      name: "",
      grade: "",
      area: "",
      description: "",
      type: ""
    },
    posts: [],
    error: '',
    editPost: null
    
  }),
  created() {
  // fetch posts
  this.getPosts();
},
  methods: {
    getPosts() {
      axios.get("http://localhost:5000/api/posts")
        .then(response => (this.posts = response.data))
        .catch(error => console.log(error));
    },
    addPost() {
      axios.post("http://localhost:5000/api/posts/add", {
        newPost: this.rutt
     }).then(response => {
       this.message = response.data;
       this.getPosts();
     });
  },
  deletePost(id) {
    axios
    .delete("http://localhost:5000/api/posts/delete/" + id).then(response => {
      this.getPosts();
    console.log(response.data);
    });
}
}
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
