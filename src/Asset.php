<?php
/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2019 Power Kernel
 */

namespace powerkernel\signaturepad;

use yii\web\AssetBundle;

/**
 * Class Asset
 * @package inquid\signature
 */
class Asset extends AssetBundle
{
    public $sourcePath = '@vendor/powerkernel/yii-signaturepad/src/assets/';
    public $js = [
        'https://cdn.jsdelivr.net/npm/signature_pad@2.3.2/dist/signature_pad.min.js',
        'app.js'
    ];
    public $depends = ['yii\web\JqueryAsset'];
}