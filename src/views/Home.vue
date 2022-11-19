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
        :key="card.id"
        :info="card"
      />
    </div>
    <div class="col-2">sidebar</div>
  </div>
</template>

<script>
import { app } from "@/firebase";
import { ref, reactive } from "vue";
import InstagramCard from "@/components/InstagramCard.vue";
import store from "@/store";
import { db } from "@/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default {
  name: "home",
  components: {
    InstagramCard,
  },
  setup() {
    const store = reactive({});
    const newImageUrl = ref("");
    const newImageDescription = ref("");

    const getPost = () => {
      const query = getDocs(collection(db, "post")) //proveriti metodu .orderBy('posted_at, desc)
        .then((query) => {
          let cards = [];
          query.forEach((doc) => {
            const data = doc.data();

            cards.value.push({
              id: doc.id,
              time: data.posted_at,
              description: data.desc,
              url: data.url,
            });
          });
        })

        .catch((error) => {
          console.log("nijesu podaci isporuceni", error);
        });
    };

    const postNewImage = async () => {
      const postCollRef = await addDoc(collection(db, "posts"), {
        url: newImageUrl.value,
        desc: newImageDescription.value,
        email: store,
        posted_at: Date.now(),
      }).then((doc) => {
        console.log("Spremljeno", doc);
        newImageDescription.value = ""; // sa ovim ponistavamo da u polje za unos kad se posalju podaci da ostane prazno.
        newImageUrl.value = ""; // sa ovim isto ponistavamo da posle unosa u input polje ostane prazno,kad se podaci posalju.
      });
    };

    const filteredCards = () => {
      let termin = store.searchTerm;
      return cards.filter((card) => card.description.includes(termin));
    };

    return {
      cards: [{}],
      store,
      getPost,
      postNewImage,
      filteredCards,
      newImageDescription: "",
      newImageUrl: "",
    };
  },
};
</script>
