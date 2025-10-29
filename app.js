(function(){
  const galleryEl = document.getElementById("gallery");
  const lightboxEl = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");
  const filtersEl = document.getElementById("filters");
  const musicBtn = document.getElementById("musicToggle");
  const bgm = document.getElementById("bgm");
  const musicShow = document.getElementById("musicShow");

  function isVideoUrl(url){
    return /\.(mp4|webm|ogg)(\?|#|$)/i.test(url);
  }
  function parseYouTubeId(url){
    try{
      var u = new URL(url);
      var host = u.hostname.replace(/^www\./, "");
      if(host === "youtube.com" || host === "m.youtube.com" || host === "youtube-nocookie.com"){
        if(u.searchParams.get("v")) return u.searchParams.get("v");
        var parts = u.pathname.split("/").filter(Boolean);
        var i = parts.indexOf("shorts");
        if(i !== -1 && parts[i+1]) return parts[i+1];
        i = parts.indexOf("embed");
        if(i !== -1 && parts[i+1]) return parts[i+1];
      }
      if(host === "youtu.be"){
        var segs = u.pathname.split("/").filter(Boolean);
        if(segs[0]) return segs[0];
      }
    } catch(e){}
    return null;
  }

  function normalizePhotos(input){
    if(typeof input === "string"){
      return input
        .split(/[\,\n]/)
        .map(function(s){ return s.trim().replace(/^@+/, ""); })
        .filter(function(s){ return s.length > 0; })
        .map(function(url){
          var yt = parseYouTubeId(url);
          if(yt){ return { url: url, type: "youtube", youtubeId: yt }; }
          return { url: url, type: isVideoUrl(url) ? "video" : "image" };
        });
    }
    if(Array.isArray(input)){
      if(input.length === 0) return [];
      if(typeof input[0] === "string"){
        return input
          .map(function(s){ return String(s).trim(); })
          .filter(function(s){ return s.length > 0; })
          .map(function(url){
            var yt = parseYouTubeId(url);
            if(yt){ return { url: url, type: "youtube", youtubeId: yt }; }
            return { url: url, type: isVideoUrl(url) ? "video" : "image" };
          });
      }
      return input.map(function(it){
        if(!it) return it;
        if(!it.type && it.url){
          var yt = parseYouTubeId(it.url);
          if(yt){ it.type = "youtube"; it.youtubeId = yt; }
          else { it.type = isVideoUrl(it.url) ? "video" : "image"; }
        }
        return it;
      });
    }
    return [];
  }

  function createCard(photo){
    const card = document.createElement("button");
    card.className = "card";
    card.type = "button";
    card.setAttribute("aria-label", photo.title || "Xem ảnh");

    var mediaEl;
    if(photo.type === "video"){
      mediaEl = document.createElement("video");
      mediaEl.muted = true;
      mediaEl.playsInline = true;
      mediaEl.src = photo.url;
      const playTag = document.createElement("div");
      playTag.className = "card__play";
      playTag.textContent = "▶ Video";
      card.appendChild(mediaEl);
      card.appendChild(playTag);
    } else if(photo.type === "youtube"){
      mediaEl = document.createElement("img");
      mediaEl.loading = "lazy";
      var thumb = photo.youtubeId ? ("https://img.youtube.com/vi/"+photo.youtubeId+"/hqdefault.jpg") : photo.url;
      mediaEl.src = thumb;
      mediaEl.alt = photo.title || "YouTube";
      const playTag = document.createElement("div");
      playTag.className = "card__play";
      playTag.textContent = "▶ YouTube";
      card.appendChild(mediaEl);
      card.appendChild(playTag);
    } else {
      mediaEl = document.createElement("img");
      mediaEl.loading = "lazy";
      mediaEl.src = photo.url;
      mediaEl.alt = photo.title || "Kỷ niệm";
      card.appendChild(mediaEl);
    }

    const caption = document.createElement("div");
    caption.className = "card__caption";
    const titleSpan = document.createElement("span");
    titleSpan.textContent = photo.title || "";
    const yearSpan = document.createElement("span");
    yearSpan.className = "badge";
    yearSpan.textContent = photo.year ? String(photo.year) : "";
    caption.appendChild(titleSpan);
    if(photo.year){ caption.appendChild(yearSpan); }

    // mediaEl was already appended above
    card.appendChild(caption);

    card.addEventListener("click", function(){
      openLightbox(photo);
    });

    return card;
  }

  const lightboxVideo = document.getElementById("lightboxVideo");
  const lightboxFrame = document.getElementById("lightboxFrame");

  function openLightbox(photo){
    if(photo.type === "video"){
      if(lightboxVideo){
        lightboxVideo.style.display = "block";
        lightboxImg.style.display = "none";
        if(lightboxFrame){ lightboxFrame.removeAttribute("src"); lightboxFrame.style.display = "none"; }
        lightboxVideo.src = photo.url;
        lightboxVideo.currentTime = 0;
        lightboxVideo.play().catch(function(){});
      }
    } else if(photo.type === "youtube"){
      if(lightboxFrame){
        lightboxFrame.style.display = "block";
        lightboxImg.style.display = "none";
        if(lightboxVideo){ lightboxVideo.pause(); lightboxVideo.removeAttribute("src"); lightboxVideo.load(); lightboxVideo.style.display = "none"; }
        var embed = photo.youtubeId ? ("https://www.youtube.com/embed/"+photo.youtubeId+"?autoplay=1&rel=0") : photo.url;
        lightboxFrame.src = embed;
      }
    } else {
      lightboxImg.src = photo.url;
      lightboxImg.alt = photo.title || "Ảnh kỷ niệm";
      if(lightboxVideo){ lightboxVideo.pause(); lightboxVideo.removeAttribute("src"); lightboxVideo.load(); lightboxVideo.style.display = "none"; }
      if(lightboxFrame){ lightboxFrame.removeAttribute("src"); lightboxFrame.style.display = "none"; }
      lightboxImg.style.display = "block";
    }
    lightboxCaption.textContent = photo.title || "";
    lightboxEl.classList.add("show");
    lightboxEl.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox(){
    lightboxEl.classList.remove("show");
    lightboxEl.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
    if(lightboxVideo){ lightboxVideo.pause(); lightboxVideo.removeAttribute("src"); lightboxVideo.load(); lightboxVideo.style.display = "none"; }
    if(lightboxFrame){ lightboxFrame.removeAttribute("src"); lightboxFrame.style.display = "none"; }
    document.body.style.overflow = "";
  }

  lightboxClose.addEventListener("click", closeLightbox);
  lightboxEl.addEventListener("click", function(e){
    if(e.target === lightboxEl){ closeLightbox(); }
  });
  document.addEventListener("keydown", function(e){
    if(e.key === "Escape" && lightboxEl.classList.contains("show")){
      closeLightbox();
    }
  });

  function getCategories(){
    // Ưu tiên CATEGORIES. Nếu không có, rơi về PHOTOS (mặc định "Tất cả").
    if(typeof window !== "undefined" && window.CATEGORIES !== undefined){ return window.CATEGORIES; }
    if(typeof CATEGORIES !== "undefined"){ return CATEGORIES; }
    var photosRaw = (typeof window !== "undefined" && window.PHOTOS !== undefined) ? window.PHOTOS : (typeof PHOTOS !== "undefined" ? PHOTOS : []);
    return { TatCa: photosRaw };
  }

  function categoryDisplayName(key){
    if(key === "TatCa") return "Tất cả";
    if(key === "Tiểu Đội 203") return "Tiểu Đội 203";
    if(key === "Tiểu Đội 204") return "Tiểu Đội 204";
    if(key === "Tiểu Đội 301") return "Tiểu Đội 301";
    if(key === "Tiểu Đội 302") return "Tiểu Đội 302";
    if(key === "Tiểu Đội 303") return "Tiểu Đội 303";
    if(key === "Tiểu Đội 304") return "Tiểu Đội 304";
    return key;
  }

  function buildFilterBar(keys, activeKey){
    if(!filtersEl) return;
    filtersEl.innerHTML = "";
    keys.forEach(function(key){
      const btn = document.createElement("button");
      btn.className = "filter-btn";
      btn.type = "button";
      btn.textContent = categoryDisplayName(key);
      const pressed = key === activeKey;
      btn.setAttribute("aria-pressed", pressed ? "true" : "false");
      if(pressed){ btn.classList.add("active"); }
      btn.addEventListener("click", function(){
        currentCategory = key;
        resetAndRender();
      });
      filtersEl.appendChild(btn);
    });
  }

  function flattenAll(categories){
    var all = [];
    Object.keys(categories).forEach(function(key){
      var list = normalizePhotos(categories[key]);
      all = all.concat(list);
    });
    return all;
  }

  var currentCategory = "TatCa";
  var currentData = [];
  var pageSize = 24;
  var pageIndex = 0;
  const loadMoreBtn = document.getElementById("loadMore");

  function updateLoadMoreVisibility(){
    if(!loadMoreBtn) return;
    var loaded = Math.min((pageIndex+1)*pageSize, currentData.length);
    var hasMore = loaded < currentData.length;
    loadMoreBtn.hidden = !hasMore;
  }

  function renderPage(){
    var start = pageIndex * pageSize;
    var end = Math.min(start + pageSize, currentData.length);
    for(var i=start;i<end;i++){
      const card = createCard(currentData[i]);
      galleryEl.appendChild(card);
    }
    updateLoadMoreVisibility();
  }

  function resetAndRender(){
    galleryEl.innerHTML = "";
    pageIndex = 0;
    render();
    renderPage();
  }

  function render(){
    var cats = getCategories();
    var keys = Object.keys(cats);
    // Bảo đảm có "TatCa" là nhóm tổng hợp
    if(keys.indexOf("TatCa") === -1){
      cats = Object.assign({ TatCa: flattenAll(cats) }, cats);
      keys = Object.keys(cats);
    }
    // Xây filter nếu có thanh filter
    buildFilterBar(keys, currentCategory);

    var data;
    var selected = cats[currentCategory];
    if(currentCategory === "TatCa" && Array.isArray(selected)){
      data = selected; // đã là mảng chuẩn hoá khi tạo ở trên
    } else {
      data = normalizePhotos(selected);
    }
    currentData = data;
  }

  // Music controls
  if(bgm){ bgm.volume = 0.5; }
  function updateMusicUI(isPlaying){
    if(!musicBtn) return;
    musicBtn.setAttribute("aria-pressed", isPlaying ? "true" : "false");
    musicBtn.textContent = isPlaying ? "⏸" : "♫";
  }
  // Playlist support
  var playlist = (typeof window !== "undefined" && Array.isArray(window.MUSIC_PLAYLIST)) ? window.MUSIC_PLAYLIST : ["music.mp3"];
  var trackIndex = 0;
  function loadTrack(index){
    if(!bgm) return;
    trackIndex = (index + playlist.length) % playlist.length;
    bgm.src = String(playlist[trackIndex]);
  }
  function playCurrent(){
    if(!bgm) return;
    bgm.play().then(function(){ updateMusicUI(true); }).catch(function(){ /* user gesture may be needed */ });
  }
  function playNext(){
    if(!bgm) return;
    loadTrack(trackIndex + 1);
    playCurrent();
  }
  if(musicBtn && bgm){
    // initialize first track
    loadTrack(0);
    musicBtn.addEventListener("click", function(){
      if(bgm.paused){
        // if no src yet, ensure loaded
        if(!bgm.src){ loadTrack(trackIndex); }
        playCurrent();
      } else {
        bgm.pause();
        updateMusicUI(false);
      }
    });
    // Double-click to hide button; show small tab to restore
    musicBtn.addEventListener("dblclick", function(){
      musicBtn.classList.add("hidden");
      if(musicShow){ musicShow.style.display = "inline-block"; }
    });
    if(musicShow){
      musicShow.addEventListener("click", function(){
        musicBtn.classList.remove("hidden");
        musicShow.style.display = "none";
      });
    }
    bgm.addEventListener("ended", function(){
      if(playlist.length > 1){
        playNext();
      } else {
        updateMusicUI(false);
      }
    });
  }

  if(loadMoreBtn){
    loadMoreBtn.addEventListener("click", function(){
      pageIndex += 1;
      renderPage();
    });
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", resetAndRender);
  } else {
    resetAndRender();
  }
})();

