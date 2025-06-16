<?php

namespace App\Enums;

enum PostType: string
{
    case NEWS = 'news';
    case BENEFIT = 'benefit';
    case EVENT = 'event';
}
