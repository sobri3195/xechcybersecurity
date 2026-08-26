<?php
declare(strict_types=1);
final class Scoring { public static function solve(int $base, int $hints, bool $firstBlood): array { if($base<0||$hints<0||$hints>3) throw new InvalidArgumentException('Invalid score input'); $penalties=[0,10,25,50]; $score=(int)floor($base*(100-$penalties[$hints])/100); $noHint=$hints===0?(int)floor($base*.2):0; $blood=$firstBlood?50:0; return ['base_after_hints'=>max(0,$score),'no_hint_bonus'=>$noHint,'first_blood_bonus'=>$blood,'total'=>max(0,$score+$noHint+$blood)]; } }
