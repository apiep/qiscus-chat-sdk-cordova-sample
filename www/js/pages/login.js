define([
  'jquery',
  'service/route',
  'service/content',
  'service/qiscus',
  'service/html',
  'service/emitter',
], function ($, route, $content, qiscus, html, emitter) {
  function initiateChat(nonce, name, user_id) {
    const headers = new Headers();
    headers.set('content-type', 'application/json');

    return fetch(
      'https://multichannel.qiscus.com/api/v2/qiscus/initiate_chat',
      {
        method: 'post',
        body: JSON.stringify({
          nonce,
          app_id: qiscus.AppId,
          user_id,
          name,
        }),
        headers: headers,
      }
    )
      .then((r) => r.json())
      .then((r) => r.data);
  }
  function LoginPage(state) {
    // For some reason, jquery.on('submit') are very slow
    // and did not want to call qiscus.setUser
    document.addEventListener('submit', function (event) {
      if (event.target.id === 'LoginForm') {
        event.preventDefault();
        var name = $('#name').val();
        var user_id = $('#email').val();
        qiscus
          .getNonce()
          .then(({ nonce }) => initiateChat(nonce, name, user_id))
          .then(async (resp) => {
            const user = await qiscus
              .verifyIdentityToken(resp.identity_token)
              .then((r) => r.user);
            const room = resp.customer_room;
            return { room, user };
          })
          .then(({ user, room }) => {
            qiscus.setUserWithIdentityToken({ user });
            emitter.on('qiscus::login-success', () => {
              qiscus.getRoomById(room.room_id).then(function (data) {
                route.push('/chat-room', {
                  roomId: room.room_id,
                  roomName: room.name,
                  roomAvatar: room.user_avatar_url,
                });
              });
            });
          });
      }
    });
    return html`
      <div class="LoginPage">
        <img src="/img/logo.svg" class="logo" alt="qiscus-logo" />
        <form id="LoginForm">
          <div class="form-group">
            <label for="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              autocomplete="off"
              value="guest-101"
            />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value="guest-101@mailinator.com"
            />
          </div>
          <div class="form-group">
            <button type="submit" id="submit-login-btn">
              Start <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </form>
      </div>
    `;
  }
  LoginPage.path = '/login';

  return LoginPage;
});
