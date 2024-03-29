import * as act from "../actions";
import reducer from "../reducer";
import initialState from "../state";

const video = { artist: "artist", title: "title", videoId: "videoId" };

describe("state", () => {
  it("returns the initial state", () => {
    const actual = reducer(undefined, { type: "INIT" });

    const expected = {
      playlists: null,
      currentPlaylist: null,
      currentVideo: null,
      form: { artist: "", title: "", videoId: "" },
      showForm: false
    };

    expect(actual).toEqual(expected);
  });

  describe("ADD_PLAYLIST action", () => {
    describe("when there is no playlist", () => {
      it("creates the first playlist", () => {
        const actual = reducer(undefined, act.addPlaylist());

        const expected = {
          playlists: [[]],
          currentPlaylist: 0,
          currentVideo: null,
          form: { artist: "", title: "", videoId: "" },
          showForm: true
        };

        expect(actual).toEqual(expected);
      });
    });

    describe("when there is already a playlist", () => {
      it("creates a new playlist and sets it as current", () => {
        const actualState = {
          ...initialState,
          playlists: [[video, video], [video]]
        };
        const actual = reducer(actualState, act.addPlaylist());

        const expected = {
          playlists: [[video, video], [video], []],
          currentPlaylist: 2,
          currentVideo: null,
          form: { artist: "", title: "", videoId: "" },
          showForm: true
        };

        expect(actual).toEqual(expected);
      });
    });
  });

  describe("ADD_VIDEO action", () => {
    it("adds the video to the playlist", () => {
      const actualState = {
        playlists: [[]],
        currentPlaylist: 0,
        currentVideo: null,
        form: video,
        showForm: true
      };
      const actual = reducer(actualState, act.addVideo());

      const expected = {
        playlists: [[{ artist: "artist", title: "title", videoId: "videoId" }]],
        currentPlaylist: 0,
        currentVideo: 0,
        form: { artist: "", title: "", videoId: "" },
        showForm: false
      };

      expect(actual).toEqual(expected);
    });

    describe("when there is many playlists", () => {
      it("adds the video to current playlist", () => {
        const actualState = {
          playlists: [[video, video], [video, video], [video, video]],
          currentPlaylist: 1,
          currentVideo: 1,
          form: {
            artist: "new artist",
            title: "new title",
            videoId: "new videoId"
          },
          showForm: true
        };
        const actual = reducer(actualState, act.addVideo());

        const expected = {
          playlists: [
            [video, video],
            [
              video,
              video,
              {
                artist: "new artist",
                title: "new title",
                videoId: "new videoId"
              }
            ],
            [video, video]
          ],
          currentPlaylist: 1,
          currentVideo: 1,
          form: { artist: "", title: "", videoId: "" },
          showForm: false
        };

        expect(actual).toEqual(expected);
      });
    });
  });

  describe("NEXT_VIDEO action", () => {
    it("goes to the next video", () => {
      const actualState = {
        playlists: [[video, video]],
        currentPlaylist: 0,
        currentVideo: 0,
        form: { artist: "", title: "", videoId: "" }
      };
      const actual = reducer(actualState, act.nextVideo());

      const expected = {
        playlists: [[video, video]],
        currentPlaylist: 0,
        currentVideo: 1,
        form: { artist: "", title: "", videoId: "" }
      };

      expect(actual).toEqual(expected);
    });

    describe("when playlist finishes", () => {
      it("goes to the first video", () => {
        const actualState = {
          playlists: [[video, video]],
          currentPlaylist: 0,
          currentVideo: 1,
          form: { artist: "", title: "", videoId: "" }
        };
        const actual = reducer(actualState, act.nextVideo());

        const expected = {
          playlists: [[video, video]],
          currentPlaylist: 0,
          currentVideo: 0,
          form: { artist: "", title: "", videoId: "" }
        };

        expect(actual).toEqual(expected);
      });
    });
  });

  describe("SELECT_VIDEO action", () => {
    it("goes to the selected video", () => {
      const actualState = {
        playlists: [[video, video, video]],
        currentPlaylist: 0,
        currentVideo: 0,
        form: { artist: "", title: "", videoId: "" }
      };
      const actual = reducer(actualState, act.selectVideo(2));

      const expected = {
        playlists: [[video, video, video]],
        currentPlaylist: 0,
        currentVideo: 2,
        form: { artist: "", title: "", videoId: "" }
      };

      expect(actual).toEqual(expected);
    });
  });

  describe("SELECT_PLAYLIST action", () => {
    it("goes to the selected playlist", () => {
      const actualState = {
        playlists: [[video, video], [video, video]],
        currentPlaylist: 0,
        currentVideo: 0,
        form: { artist: "", title: "", videoId: "" }
      };
      const actual = reducer(actualState, act.selectPlaylist(1));

      const expected = {
        playlists: [[video, video], [video, video]],
        currentPlaylist: 1,
        currentVideo: 0,
        form: { artist: "", title: "", videoId: "" }
      };

      expect(actual).toEqual(expected);
    });

    describe("when changes the playlist", () => {
      it("goes to the first video of the playlist", () => {
        const actualState = {
          playlists: [[video, video, video], [video, video, video]],
          currentPlaylist: 1,
          currentVideo: 2,
          form: { artist: "", title: "", videoId: "" }
        };
        const actual = reducer(actualState, act.selectPlaylist(0));

        const expected = {
          playlists: [[video, video, video], [video, video, video]],
          currentPlaylist: 0,
          currentVideo: 0,
          form: { artist: "", title: "", videoId: "" }
        };

        expect(actual).toEqual(expected);
      });
    });
  });

  describe("SET_ARTIST action", () => {
    it("edits the artist form value", () => {
      const actualState = {
        playlists: [[video, video, video]],
        currentPlaylist: 0,
        currentVideo: 0,
        form: { artist: "", title: "", videoId: "" }
      };
      const actual = reducer(actualState, act.setArtist("Lady Gaga"));

      const expected = {
        playlists: [[video, video, video]],
        currentPlaylist: 0,
        currentVideo: 0,
        form: { artist: "Lady Gaga", title: "", videoId: "" }
      };

      expect(actual).toEqual(expected);
    });
  });

  describe("SET_TITLE action", () => {
    it("edits the title form value", () => {
      const actualState = {
        playlists: [[video, video, video]],
        currentPlaylist: 0,
        currentVideo: 0,
        form: { artist: "", title: "", videoId: "" }
      };
      const actual = reducer(actualState, act.setTitle("Shallow"));

      const expected = {
        playlists: [[video, video, video]],
        currentPlaylist: 0,
        currentVideo: 0,
        form: { artist: "", title: "Shallow", videoId: "" }
      };

      expect(actual).toEqual(expected);
    });
  });

  describe("SET_VIDEO_ID action", () => {
    it("edits the videoId form value", () => {
      const actualState = {
        playlists: [[video, video, video]],
        currentPlaylist: 0,
        currentVideo: 0,
        form: { artist: "", title: "", videoId: "" }
      };
      const actual = reducer(actualState, act.setVideoId("JPJjwHAIny4"));

      const expected = {
        playlists: [[video, video, video]],
        currentPlaylist: 0,
        currentVideo: 0,
        form: {
          artist: "",
          title: "",
          videoId: "JPJjwHAIny4"
        }
      };

      expect(actual).toEqual(expected);
    });
  });

  describe("TOGGLE_SHOW_FORM action", () => {
    it("shows form to add videos", () => {
      const actualState = {
        playlists: [[video, video, video]],
        currentPlaylist: 0,
        currentVideo: 0,
        form: { artist: "", title: "", videoId: "" },
        showForm: false
      };
      const actual = reducer(actualState, act.toggleShowForm());

      const expected = {
        playlists: [[video, video, video]],
        currentPlaylist: 0,
        currentVideo: 0,
        form: {
          artist: "",
          title: "",
          videoId: ""
        },
        showForm: true
      };

      expect(actual).toEqual(expected);
    });

    it("hides form to add videos", () => {
      const actualState = {
        playlists: [[video, video, video]],
        currentPlaylist: 0,
        currentVideo: 0,
        form: { artist: "", title: "", videoId: "" },
        showForm: true
      };
      const actual = reducer(actualState, act.toggleShowForm());

      const expected = {
        playlists: [[video, video, video]],
        currentPlaylist: 0,
        currentVideo: 0,
        form: {
          artist: "",
          title: "",
          videoId: ""
        },
        showForm: false
      };

      expect(actual).toEqual(expected);
    });
  });
});
