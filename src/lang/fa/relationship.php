<?php

require_once __DIR__ . '/Helper/MessageHelper.php';

return [
    'name_required' => $requiredMessage('رابطه خویشاوندی'),
    'name_min' => $minStringMessage('رابطه خویشاوندی', 2),
    'name_max' => $maxStringMessage('رابطه خویشاوندی', 50),
];
