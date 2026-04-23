document.addEventListener("DOMContentLoaded", function () {

  const btn = document.getElementById("calcBtn");

  btn.addEventListener("click", function () {

    // 入力値取得
    const orders = Number(document.getElementById("orders").value);
    const sku = Number(document.getElementById("sku").value);
    const workers = Number(document.getElementById("workers").value);

    // 入力チェック
    if (!orders || !sku || !workers) {
      alert("すべての項目を入力してください");
      return;
    }

    /*
    ▼ ロジック（簡易モデル）
    現状：
    1件あたりピッキング時間 = SKU × 30秒
    シェルフロー導入後：
    SKU × 18秒（40%削減想定）
    */

    const currentTime = orders * sku * 30; // 秒
    const improvedTime = orders * sku * 18;

    const reductionRate = ((currentTime - improvedTime) / currentTime) * 100;

    /*
    ▼ 人件費計算
    時給1500円仮定
    */
    const hourlyCost = 1500;

    const currentHours = currentTime / 3600;
    const improvedHours = improvedTime / 3600;

    const costDiff = (currentHours - improvedHours) * hourlyCost;

    /*
    ▼ 投資回収（月）
    仮：月額5万円
    */
    const monthlyFee = 50000;
    const paybackMonths = monthlyFee / costDiff;

    /*
    ▼ 表示
    */
    document.getElementById("resultEfficiency").innerText =
      "▲" + reductionRate.toFixed(0) + "%";

    document.getElementById("resultCost").innerText =
      "▲" + Math.floor(costDiff * 22).toLocaleString() + "円/月";

    document.getElementById("resultPayback").innerText =
      paybackMonths > 0
        ? "約" + paybackMonths.toFixed(1) + "ヶ月"
        : "-";

  });

});