<?php
require('pdf.php'); 
$svg = $_REQUEST["svg"];
$pdf=new FPDF('L'); 
$pdf->SetFont('Arial','',14);
$pdf->AddPage();
$pdf->Image($svg,0,0,325,200,'PNG');
ob_start();
$pdf->Output();
?>