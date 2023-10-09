<!DOCTYPE html>
<html lang="fa" dir="rtl">

<head>
    <base href="./">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="keyword" content="">
    <link rel="apple-touch-icon" sizes="180x180" href="{{$THEME::BASE_URL}}/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="{{$THEME::BASE_URL}}/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="{{$THEME::BASE_URL}}/favicon-16x16.png">
    <link rel="manifest" href="{{$THEME::BASE_URL}}/site.webmanifest">
    <link rel="mask-icon" href="{{$THEME::BASE_URL}}/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">
    <title>{{ __('general._title') }}</title>
    @php
    try {
    $filename = 'assets/css/style_rtl.css';
    $fileModified = substr(md5(filemtime($filename)), 0, 6);
    } catch (\Exception) {
    $fileModified = '';
    }
    @endphp
    <link href="{{$THEME::CSS_PATH}}/style_rtl.css?v={{$fileModified}}" rel="stylesheet">
    <style>
        th,
        td {
            border: 1px solid #000;
            padding: 0 5px;
            font-size: 12px;
            overflow: hidden;
            white-space: nowrap;
        }
    </style>
</head>

<body style="background-color: #fff;">
    <div class="a4 landscape">
       <div class="content">
        <p class="line1">
            <span class="data field1">field1</span>
        </p>
        <p class="line1">
            <span class="data field2">field2</span>
        </p>
        <p class="line2">
            <span class="data field3">field3</span>
        </p>
        <p class="line3">
            <span class="data field4">field4</span>
        </p>
        <p class="line4">
            <span class="data field5">field5</span>
        </p>
        <p class="line5">
            <span class="data field6">field6</span>
            <span class="data field7">field7</span>
            <span class="data field8">field8</span>
        </p>
        <p class="line6">
            <span class="data field9">field9</span>
        </p>
        <p class="line7">
            <span class="data field10">field10</span>
            <span class="data field11">field11</span>
            <span class="data field12">field12</span>
            <span class="data field13">field13</span>
        </p>
        <p class="line8">
            <span class="data field14">field14</span>
            <span class="data field15">field15</span>
            <span class="data field16">field16</span>
        </p>
       </div>
       <div class="content-sidebar">
        <p class="line1">
            <span class="data field1">field1</span>
        </p>
        <p class="line2">
            <span class="data field2">field2</span>
        </p>
        <p class="line3">
            <span class="data field3">field3</span>
        </p>
        <p class="line4">
            <span class="data field4">field4</span>
        </p>
        <p class="line5">
            <span class="data field5">field5</span>
        </p>
        <p class="line6">
            <span class="data field6">field6</span>
        </p>
        <p class="line7">
            <span class="data field7">field7</span>
        </p>
        <p class="line8">
            <span class="data field8">field8</span>
        </p>
        <p class="line9">
            <span class="data field9">field9</span>
        </p>
    </div>
</body>

</html>