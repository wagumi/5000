# 5000

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/af76a103-606d-4350-91de-a14141e5aad3/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220411T042826Z&X-Amz-Expires=86400&X-Amz-Signature=cf07daf335fb479df4d0f03623b773bd203b1f48cb944d9f6bfeeb1127cbbe4e&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

# /get_poap

POAPをmintするページのURLを返します。

本番環境において、**コミュニティメンバーが実行するのはこちらのコマンドのみ**になります。

既にURLを取得したユーザーに対しては同一のURLを返します。

### <実行結果>

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/f8ccf888-a9cd-4b4c-bdda-012a0f4f6a81/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220411T042915Z&X-Amz-Expires=86400&X-Amz-Signature=8772d685bea7db595daa8cd0e47a200f971b296d31d479766e823298cd2996a1&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

---

# /reset_mint

コマンドを実行したユーザーのmint履歴をリセットします。（**開発/動作確認時のみ**）

動作確認時において毎回同じURLが戻ってきては検証にならないので、必要に応じて検証者のmint履歴をリセットします。
リセット後に/get_poapコマンドを実行すると異なるURLが返ってきます。

### <実行結果>

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/42df3cb0-89c1-4ded-89f5-defad2e9f17d/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220411T042957Z&X-Amz-Expires=86400&X-Amz-Signature=bf5777156ea0f2d769fd8044669e28b044a0eb9f768f6f3889127112036c7d90&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

---

# /reset_user <user id>

引数で指定したユーザーのmint履歴をリセットします。（**指定ロール/指定ユーザーのみ**）

ユーザー名から絞り込んで選択します。

本番環境で特定のユーザーのmintに問題が発生した場合に使用します。

### <ユーザー選択>

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/3921dfd5-11cd-4728-ac4c-ea1fde7e519d/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220411T043043Z&X-Amz-Expires=86400&X-Amz-Signature=97236abf2459a1391ef4aca2f0789df7e244fde6c455b420627143592bae77c9&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

### <実行結果>

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/ae1ea73c-c537-42c0-81d8-1ebba01aa19d/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220411T043126Z&X-Amz-Expires=86400&X-Amz-Signature=b312620302a8b51ee4f53047173849540a6146aeb031aa44cece5405642961f8&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

---

# /ping

botの稼働確認を行います。”pong”が返されます。

### <実行結果>

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/8912e3fa-5f5f-4cfc-8e40-60474aff7bf3/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220411T043153Z&X-Amz-Expires=86400&X-Amz-Signature=86b34b9fe57240c7f2853fbbd8c338d2e54fac22587ba848654f281b58933be6&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)
