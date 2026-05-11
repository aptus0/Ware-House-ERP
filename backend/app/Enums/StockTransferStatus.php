<?php

namespace App\Enums;

enum StockTransferStatus: string
{
    case Draft = 'draft';
    case Approved = 'approved';
    case Completed = 'completed';
    case Cancelled = 'cancelled';
}
