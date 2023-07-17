<?php

require __DIR__ . '/Helper/MessageHelper.php';

return [
    'district_undefined' => '',
    'district_1' => 'مرکزی',
    'district_2' => 'میان‌ولایت',
    'name_required' => $requiredMessage('نام'),
    'name_min' => $minStringMessage('نام', 2),
    'name_max' => $maxStringMessage('نام', 50),
    'district_id_required' => $selectMessage('بخش'),
    'district_id_numeric' => $selectMessage('بخش'),
    'district_id_min' => $selectMessage('بخش'),
    'district_id_max' => $selectMessage('بخش'),
];
