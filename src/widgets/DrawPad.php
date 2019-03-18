<?php
/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2019 Power Kernel
 */
namespace powerkernel\signaturepad\widgets;


use powerkernel\signaturepad\Asset;
use yii\helpers\Html;

/**
 * Class DrawPad
 */
class DrawPad extends \yii\base\Widget
{

    public $inputTarget='';

    public $width='100%';
    public $height='320px';

    public $clear=true;
    public $undo=true;

    public $action_buttons;

    /**
     * @inheritdoc
     */
    public function init()
    {
        parent::init();

        if ($this->clear == true) {
            $this->action_buttons .= '<button type="button" class="btn btn-sm btn-primary clear" data-action="clear">Clear</button>';
        }

        if ($this->undo == true) {
            $this->action_buttons .= '<button type="button" class="btn btn-sm btn-warning undo" data-action="undo">Undo</button>';
        }

        Asset::register($this->view);

    }

    /**
     * @inheritdoc
     * @return string
     */
    public function run()
    {
        return $this->render('drawPad');
    }
}