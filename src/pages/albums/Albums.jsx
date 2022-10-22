import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreateAlbumModal from "../../components/modals/CreateAlbumModal";
import { firestore } from "../../firebase/firebaseClient";

const Albums = ({ auth, albums, setAlbums }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [albumName, setAlbumName] = useState("");
  const [albumCreated, setAlbumCreated] = useState(false);

  const createAlbum = async () => {
    try {
      await setDoc(doc(collection(firestore, "albums")), {
        title: albumName,
        createdAt: serverTimestamp(),
      });
      setAlbumCreated(true);
      handleClose();
    } catch (error) {
      console.log("createAlbum Error", error);
    }
  };

  useEffect(() => {
    const albumsQuery = query(
      collection(firestore, "albums"),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(albumsQuery, (snap) => {
      const albums = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAlbums(albums);
    });

    return () => {
      unsub();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [albumCreated]);

  console.log(albums);

  return (
    <Container>
      <Box
        paddingTop={4}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        marginBottom={4}
      >
        <Typography fontSize="26px" fontWeight={600}>
          Albums
        </Typography>
        {auth && (
          <Box>
            <Button
              variant="contained"
              sx={{ color: "white" }}
              onClick={handleOpen}
            >
              Create Album
            </Button>
            <CreateAlbumModal
              open={open}
              handleClose={handleClose}
              createAlbum={createAlbum}
              albumName={albumName}
              setAlbumName={setAlbumName}
            />
          </Box>
        )}
      </Box>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {albums.map((album, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Link to={`/album/${album.id}`}>
              <Card
                variant="outlined"
                sx={{ background: "var(--second-bg-dark)", borderRadius: 3 }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center" gap="15px">
                    <img
                      src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/folder-icon.png"
                      alt=""
                      height="60px"
                      width="60px"
                    />
                    <Typography fontWeight={600} fontSize="20px">
                      {album.title}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Albums;
