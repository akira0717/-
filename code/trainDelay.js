// 遅延情報を取得して表示する関数
async function fetchTrainDelayInfo() {
    try {
        // JSONデータを取得
        const response = await fetch('https://ntool.online/data/train_all.json');
        
        if (!response.ok) {
            throw new Error('ネットワークエラー: ' + response.status);
        }

        // JSONデータをパース
        const data = await response.json();

        // 遅延情報を表示するHTML要素
        const delayInfoDiv = document.getElementById('train-delay-info');

        // データが存在するか確認
        if (data.length > 0) {
            let delayInfoHtml = '<ul>';

            // 各電車の遅延情報をループ処理
            data.forEach(train => {
                delayInfoHtml += `
                    <li>
                        <strong>${train.name}</strong>: ${train.status} - ${train.message || '詳細情報なし'}
                    </li>`;
            });

            delayInfoHtml += '</ul>';
            delayInfoDiv.innerHTML = delayInfoHtml;
        } else {
            delayInfoDiv.innerHTML = '現在、遅延情報はありません。';
        }
    } catch (error) {
        // エラーが発生した場合の表示
        document.getElementById('train-delay-info').innerHTML = '情報の取得に失敗しました。';
        console.error('エラー:', error);
    }
}

// ページロード時に遅延情報を取得
window.onload = fetchTrainDelayInfo;
