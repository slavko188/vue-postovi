<template>
  <div class="row">
    <div class="col-1"></div>
    <div class="col-9">
      <form @submit.prevent="postNewImage" class="form-inline mb-5">
        <div class="form-group">
          <label for="imageUrl">Image URL</label>
          <input
            v-model="newImageUrl"
            type="text"
            class="form-control ml-2"
            placeholder="Enter the image URL"
            id="imageUrl"
          />
        </div>
        <div class="form-group">
          <label for="imageDescription">Description</label>
          <input
            v-model="newImageDescription"
            type="text"
            class="form-control ml-2"
            placeholder="Enter the image description"
            id="imageDescription"
          />
        </div>
        <button type="submit" class="btn btn-primary ml-2">Post image</button>
      </form>
      <instagram-card
        v-for="card in filteredCards"
        :key="card.url"
        :info="card"
      />
    </div>
    <div class="col-2">sidebar</div>
  </div>
</template>

<script>
import InstagramCard from "@/components/InstagramCard.vue";
import store from "@/store";
import { db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";

/*let cards = [];

cards = [
  {
    url: "https://picsum.photos/id/1/400/400",
    description: "programer",
    time: "prije 2 minuta",
  },
  {
    url: "https://picsum.photos/seed/picsum/400/400",
    description: "ovo je planina",
    time: "prije pola sata",
  },
  {
    url: "https://picsum.photos/id/0/400/400",
    description: "ovo je lap top",
    time: "prije 2 hour",
  },
];*/

export default {
  name: "home",
  data() {
    return {
      cards: [],
      store,
      newImageDescription: "",
      newImageUrl: "",
    };
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    getPosts() {
      console.log("dohvat firebase");
    },
    postNewImage() {
      const imageUrl = this.newImageUrl;
      const imageDescription = this.newImageDescription;

      const postCollRef = addDoc(collection(db, "posts"), {
        url: imageUrl,
        desc: imageDescription,
        email: store.currentUser,
        posted_at: Date.now(),
      })
        .then((doc) => {
          console.log("Spremljeno", doc);
          this.newImageDescription = ""; // sa ovim ponistavamo da u polje za unos kad se posalju podaci da ostane prazno.
          this.newImageUrl = ""; // sa ovim isto ponistavamo da posle unosa u input polje ostane prazno,kad se podaci posalju.
        })
        .catch((error) => {
          console.log("Dobili ste gresku", error);
        });
    },
  },
  computed: {
    filteredCards() {
      let termin = this.store.searchTerm;
      return this.cards.filter((card) => card.description.includes(termin));
    },
  },
  components: {
    InstagramCard,
  },
};
</script>
