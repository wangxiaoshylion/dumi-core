import html2Canvas from 'html2canvas';
import JsPDF from 'jspdf';
interface IParam {
  dom: HTMLElement;
  name?: string;
  quality?: number;
  type?: 'img' | 'pdf';
  callback?: () => void;
  imgFormat?: string;
  isOne?: boolean;
}

/**
 * dom生成图片并导出PDF或img，参数是obj形式
 * @param dom 需要导出的dom
 * @param name 导出文件名
 * @param quality 导出文件清晰度（0 - 1），默认0.2
 * @param type 导出文件类型，支持导出img或pdf，默认img
 * @callback callback 导出后回调
 * @param imgFormat 导出图片时的后缀，默认png，type是img生效
 * @param isOne PDF是否导出单页，默认单页，type是pdf时生效
 */
function exportDom({
  dom,
  name,
  type = 'img',
  quality = 0.2,
  callback,
  imgFormat = 'png',
  isOne = true,
}: IParam) {
  if (!dom) {
    console.error('serious error: ------------ dom is undefined');
    return;
  }
  const scale = type === 'img' ? 1 : 2;
  // allowTaint: true 表示允许跨越的图片,scale用于渲染的比例
  html2Canvas(dom, { allowTaint: true, scale }).then((canvas) => {
    // 生成canvas截图，1表示生成的截图质量（0-1）
    const pageData = canvas.toDataURL(
      `image/${type === 'img' ? imgFormat : 'jpeg'}`,
      quality,
    );
    const fileName = `${name ? name : type + '_' + new Date().getTime()}.${
      type === 'img' ? imgFormat : 'pdf'
    }`;
    if (type === 'img') {
      if (window?.navigator?.msSaveOrOpenBlob) {
        // IE兼容
        const blob = canvas?.msToBlob(`image/${imgFormat}`, quality);
        return window?.navigator?.msSaveOrOpenBlob(blob, fileName);
      }
      let a: any = document.querySelector('#html2Canvas');
      if (!a) {
        a = document.createElement('a');
        a.id = 'html2Canvas';
        a.style.display = 'none';
        document.body.appendChild(a);
      }
      a.href = pageData;
      a.download = fileName;
      a.click();
      callback?.();
      return;
    }
    let contentWidth = canvas.width;
    let contentHeight = canvas.height;
    let pdf;
    if (isOne) {
      // 单页
      // jspdf.js 插件对单页面的最大宽高限制 为 14400
      const limit = 14400;
      if (contentHeight > limit) {
        const contentScale = limit / contentHeight;
        contentHeight = limit;
        contentWidth = contentScale * contentWidth;
      }
      let orientation: any = 'p';
      // 在 jspdf 源码里，如果是 orientation = 'p' 且 width > height 时， 会把 width 和 height 值交换，
      // 类似于 把 orientation 的值修改为 'l' , 反之亦同。
      if (contentWidth > contentHeight) {
        orientation = 'l';
      }
      // orientation Possible values are "portrait" or "landscape" (or shortcuts "p" or "l")
      pdf = new JsPDF(orientation, 'pt', [contentWidth, contentHeight]); // 下载尺寸 a4 纸 比例
      // pdf.addImage(pageData, 'JPEG', 左，上，宽度，高度)设置
      pdf.addImage(pageData, 'JPEG', 0, 0, contentWidth, contentHeight);
    } else {
      //一页 pdf 显示 html 页面生成的 canvas高度
      let pageHeight = (contentWidth / 552.28) * 841.89;
      //未生成 pdf 的 html页面高度
      let leftHeight = contentHeight;
      //页面偏移
      let position = 0;
      //a4纸的尺寸[595.28,841.89]，html 页面生成的 canvas 在pdf中图片的宽高
      let imgWidth = 555.28;
      let imgHeight = (imgWidth / contentWidth) * contentHeight;
      const orientation: any = '';
      pdf = new JsPDF(orientation, 'pt', 'a4'); // 下载尺寸 a4 纸 比例
      //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
      //当内容未超过pdf一页显示的范围，无需分页
      if (leftHeight < pageHeight) {
        pdf.addImage(pageData, 'JPEG', 20, 0, imgWidth, imgHeight);
      } else {
        while (leftHeight > 0) {
          pdf.addImage(pageData, 'JPEG', 20, position, imgWidth, imgHeight);
          leftHeight -= pageHeight;
          position -= 841.89;
          //避免添加空白页
          if (leftHeight > 0) {
            pdf.addPage();
          }
        }
      }
    }
    pdf.save(fileName);
    callback?.();
  });
}
export default exportDom;
