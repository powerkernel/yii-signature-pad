<?php
/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2019 Power Kernel
 */

/* @var $this \yii\web\View */


?>
<div id="signature-pad" class="signature-pad" data-target="<?= $this->context->inputTarget ?>">
    <div class="signature-pad-body">
        <canvas style="width: <?= $this->context->width ?>; height: <?= $this->context->height ?>"></canvas>
    </div>
    <div class="signature-pad-footer">
        <div class="signature-pad--actions">
            <?= $this->context->action_buttons ?>
        </div>
    </div>
</div>
